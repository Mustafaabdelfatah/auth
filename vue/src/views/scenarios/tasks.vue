<template>
    <div class="ps-lg-5 pe-lg-6 h-100">
        <EmptyStateLoader v-if="newNodes.length == 0"></EmptyStateLoader>
        <VueFlow v-else :nodes="newNodes" :edges="newEdges" :default-viewport="{ zoom: 0.5 }" :min-zoom="0.3"
            :max-zoom="3" :class="directionClass" :connection-radius="30" @connect="onConnects"
            @edge-update="onEdgeUpdateShow" @edge-update-end="onEdgeUpdateEnd" @edge-update-start="onEdgeUpdateStart"
            default-marker-color="#29ABE2">
            <!-- Start Controls Buttons  -->
            <Controls class="top" style="height:fit-content" @edge-update="onEdgeUpdate"
                @edge-update-start="onEdgeUpdateStart" @edge-update-end="onEdgeUpdateEnd" />
            <!-- End Controls Buttons  -->

            <!-- Start Custom Nodes  -->
            <template #node-custom="props">
                <!-- {{ props.data.label }} -->
                <ExpansionPanel :task="props.data" @openAddModal="openAddDialog" @openEditModal="openEditDialog"
                    @openDeleteModal="deleteTask" />
            </template>
            <!-- End Custom Nodes  -->

            <!-- Start Custom Nodes  -->
            <template #node-addButton="props">
                <AddBtn @click="openAddDialog">
                    {{ t('buttons.add_new_task') }}
                </AddBtn>
            </template>
            <!-- End Custom Nodes  -->

            <!-- Start Connections Lines Edges  -->
            <template #edge-custom="buttonEdgeProps">
                <ConnectionsLines :id="buttonEdgeProps.id" :data="buttonEdgeProps" :source-x="buttonEdgeProps.sourceX"
                    :source-y="buttonEdgeProps.sourceY" :target-x="buttonEdgeProps.targetX"
                    :target-y="buttonEdgeProps.targetY" :source-position="buttonEdgeProps.sourcePosition"
                    :target-position="buttonEdgeProps.targetPosition" :marker-end="buttonEdgeProps.markerEnd"
                    :style="buttonEdgeProps.style" @removeEdge="removeEdge" />
            </template>
            <!-- End Connections Lines Edges  -->

            <!-- <template #edge-special="customEdgeProps">
                <BezierEdge
                    :source-x="customEdgeProps.sourceX"
                    :source-y="customEdgeProps.sourceY"
                    :target-x="customEdgeProps.targetX"
                    :target-y="customEdgeProps.targetY"
                    :source-position="customEdgeProps.sourcePosition"
                    :target-position="customEdgeProps.targetPosition"
                />
            </template> -->

            <Background />
        </VueFlow>
    </div>
    <AddEditTask @scenarioAdded="fetchScenarioTree" @scenarioEdited="fetchScenarioTree" v-model="dialog" />
    <ConfirmationDialog v-if="deleteItem != null" @deleted="TaskDeletedAction" @deletedItems="TasksDeletedAction"
        DialogType="unconfirm" v-model="deleteModal" :title="deleteItem.transition_name" :MultiActions="true">
        <template #singleItemsDelete>
            {{ t('buttons.delete_without_children') }}
        </template>
        <template #allItemsDelete>
            {{ t('buttons.delete_all_children') }}
        </template>
    </ConfirmationDialog>
    <ConfirmationDialog @deleted="relationDeletedAction" DialogType="unconfirm" v-model="deleteModal"
        :MultiActions="false">
        <template #title>
            {{ t('headings.relations') }}
        </template>
        <template #text>
            {{ deleteItem.source.data.name }} & {{ deleteItem.target.data.name }}
        </template>
    </ConfirmationDialog>
</template>

<script setup>
import ConfirmationDialog from '@/components/common/Dialogs/ConfirmationDialog.vue'
import ExpansionPanel from '@/views/scenarios/components/tasks/ExpansionPanel.vue'
import ConnectionsLines from '@/views/scenarios/components/tasks/ConnectionsLines.vue'
import AddBtn from '@/components/common/buttons/AddBtn.vue'
import AddEditTask from '@/views/scenarios/components/tasks/AddEditTask.vue'
import EmptyStateLoader from '@/components/common/Loaders/index.vue'


import { ref, onMounted, computed } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { getScenarioTree } from '@/services/apis/scenarios';
import { deleteLogicTask, logicTaskRelations, logicTaskPositions, getLogicTaskById } from '@/services/apis/logic-task'
import { buildGraph, parseIdString } from '@/utils/buildGraphNodes'

import { useTaskLogics } from '@/stores/task-logics'
const taskLogics = useTaskLogics()

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

import { useRoute } from 'vue-router';
const route = useRoute();

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()



import { VueFlow, Panel, useVueFlow, MarkerType, Handle, Position, BezierEdge, getBezierPath } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { Background } from '@vue-flow/background'



const {
    onEdgeUpdateStart,
    onNodeDragStop,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    onPaneReady
} = useVueFlow()

// onPaneReady((instance) => instance.setViewport({ x: 800, y: 100, zoom: .8 }))
onPaneReady((instance) => instance.fitView());

// onInit((vueFlowInstance) => {
//     vueFlowInstance.fitView()
// })


const newNodes = ref([]);
const newEdges = ref([]);

const tree = ref(null);
const dialog = ref(false);
const task = ref({});

const deleteModal = ref(false);
const deleteItem = ref(null);

onEdgeUpdate((event, edge) => {
    console.log('edge ==', edge)
})


// =(Get All Nodes)==============>
const fetchScenarioTree = async () => {
    const data = await getScenarioTree(route.params.id);
    tree.value = data;
    const { nodes, edges } = buildGraph(tree.value);
    newNodes.value = nodes;
    newEdges.value = edges;
};
// =(Add Edit Modal)=============>
const openAddDialog = (id) => {
    appStore.isCreate = true;
    taskLogics.parentID = id;
    dialog.value = !dialog.value
}
const openEditDialog = async (task) => {
    appStore.isCreate = false
    const data = await getLogicTaskById(task.id);
    taskLogics.task = data;
    console.log('taskLogics.task', taskLogics.task);
    dialog.value = !dialog.value
}

// =(Add Edges)==================>
const onConnects = async (params) => {
    await logicTaskRelations(params.target, { parent_id: params.source })
    fetchScenarioTree();
}

// =(Delete Node Relation)=======>
const removeEdge = async (id) => {
    deleteModal.value = true
    const relation = parseIdString(id.id);
    deleteItem.value = {
        source: id.sourceNode,
        target: id.targetNode,
        child_id: relation.child_id,
        parent_id: { parent_id: null }
    }
}
const relationDeletedAction = async () => {
    await logicTaskRelations(deleteItem.value.child_id, deleteItem.value.parent_id);
    fetchScenarioTree();
    deleteModal.value = false;
}

// =(Get Delete Data Node)=======>
const deleteTask = async (data) => {
    deleteModal.value = true
    deleteItem.value = data
}

// =(Delete single Node)=========>
const TaskDeletedAction = async () => {
    await deleteLogicTask(deleteItem.value.id, { children: 0 })
    fetchScenarioTree();
    deleteModal.value = false
}

// =(Delete Multi Nodes)=========>
const TasksDeletedAction = async () => {
    await deleteLogicTask(deleteItem.value.id, { children: 1 })
    fetchScenarioTree();
    deleteModal.value = false
}

// =(Update Node Relations)======>
const onEdgeUpdateShow = async ({ edge, connection }) => {
    await logicTaskRelations(connection.target, { parent_id: edge.source, old_child: edge.target })
    fetchScenarioTree();
}

// =(Update Node Position)=======>
onNodeDragStop(async ({ event, nodes, node }) => {
    await logicTaskPositions(node.id, { position: node.position });
})



// =====( Set Page Breadcrumbs )====== //
const { setBreadcrumbs } = useBreadcrumbs()
setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        href: '/'
    },
    {
        title: 'dl.scenarios',
        disabled: false,
        href: '/scenarios/all-scenarios'
    },
    {
        title: 'dl.planing',
        disabled: true,
        href: '/planing'
    }
]);






onMounted(async () => {
    await fetchScenarioTree();
});


// watch(getNodes, (nodes) => {
//     const positions = getPositions(nodes);
//     // console.log('positions====>', positions)
//     // console.log('dimensions====>', dimensions)
// })


const directionClass = computed(() => {
    return locale.value === 'ar' ? 'rtl' : 'ltr';
});

</script>

<style lang="scss">
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';
/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
// import default controls styles
@import '@vue-flow/controls/dist/style.css';

.vue-flow {
    &.rtl {
        // direction: rtl ;
    }

    &.ltr {
        // direction: ltr ;
    }
}

.vue-flow__edge-path,
.vue-flow__connection-path {
    stroke: rgba(var(--v-theme-primary), 1);
    stroke-width: 1;
    fill: none;
}


.vue-flow__node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
}
</style>
