<script setup>
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core'
import { computed, defineEmits } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    sourceX: {
        type: Number,
        required: true,
    },
    sourceY: {
        type: Number,
        required: true,
    },
    targetX: {
        type: Number,
        required: true,
    },
    targetY: {
        type: Number,
        required: true,
    },
    sourcePosition: {
        type: String,
        required: true,
    },
    targetPosition: {
        type: String,
        required: true,
    },
    markerEnd: {
        type: String,
        required: false,
    },
    style: {
        type: Object,
        required: false,
    },
})

const path = computed(() => getBezierPath(props));

const emit = defineEmits(['removeEdge']);

const removeEdges = (id) => {
    emit('removeEdge', id)
};

</script>

<script>
export default {
    inheritAttrs: false,
};
</script>

<template>
    <!-- You can use the `BaseEdge` component to create your own custom edge more easily -->
    <BaseEdge :id="id" :style="style" :path="path[0]" :marker-end="markerEnd" />

    <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
    <EdgeLabelRenderer>
        <div :style="{
            pointerEvents: 'all',
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        }" class="">
            <v-btn class="bg-error rounded-circle" flat icon="mdi-window-close" width="15" height="15" size="x-small"
                @click="removeEdges(data)"></v-btn>
        </div>
    </EdgeLabelRenderer>
</template>

<style lang="scss" scoped>
::v-deep {
    .v-btn {
        .v-icon {
            --v-icon-size-multiplier: .6;
        }
    }
}
</style>
