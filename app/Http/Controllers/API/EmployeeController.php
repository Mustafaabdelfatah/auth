<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Employee;
use App\Models\Template;
use App\Models\LogicTask;
use Illuminate\Support\Arr;
use Illuminate\Http\JsonResponse;
use Illuminate\Pipeline\Pipeline;
use App\Filters\Global\NameFilter;
use Illuminate\Support\Facades\DB;
use App\Filters\Global\EmailFilter;
use App\Filters\Global\PhoneFilter;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use App\Filters\Global\OrderByFilter;
use App\Filters\Global\JsonNameFilter;
use App\Services\Global\UploadService;
use App\Http\Requests\User\UserRequest;
use App\Http\Requests\Global\PageRequest;
use App\Http\Resources\User\UserResource;
use App\Http\Requests\API\EmployeeRequest;
use App\Services\Global\NotificationService;
use App\Http\Resources\API\EmployeeResource;
use App\Http\Requests\Global\DeleteAllRequest;

class EmployeeController extends Controller
{
    /**
     * @param PageRequest $request
     * @return JsonResponse
     */
    public function index(PageRequest $request): JsonResponse
    {
        $query = app(Pipeline::class)
            ->send(Employee::query())
            ->through([JsonNameFilter::class, OrderByFilter::class])
            ->thenReturn();
        return successResponse(fetchData($query, $request->pageSize, EmployeeResource::class));
    }

    /**
     * @param EmployeeRequest $request
     * @return JsonResponse
     */
    public function store(EmployeeRequest $request): JsonResponse
    {
        $data = Arr::except($request->validated(), ['avatar']);

        if ($request->avatar) {
            $data['avatar'] = UploadService::store($request->avatar, 'employee');
        }

        $employee = Employee::create($data);
        return successResponse(new EmployeeResource($employee), __('api.created_success'));
    }

    /**
     * @param Employee $employee
     * @return JsonResponse
     */
    public function show(Employee $employee): JsonResponse
    {
        return successResponse(new EmployeeResource($employee));
    }

    /**
     * @param EmployeeRequest $request
     * @param Employee $employee
     * @return JsonResponse
     */
    public function update(EmployeeRequest $request, Employee $employee): JsonResponse
    {
        $data = Arr::except($request->validated(), ['avatar']);
        if ($request->avatar) {
            $data['avatar'] = UploadService::store($request->avatar, 'employees');
        }
        $employee->update($data);
        return successResponse(new EmployeeResource($employee), __('api.updated_success'));
    }

    /**
     * @param Employee $employee
     * @return JsonResponse
     */
    public function destroy(Employee $employee): JsonResponse
    {
        UploadService::delete($employee->avatar);
        $employee->delete();
        return successResponse(msg: __('api.deleted_success'));
    }

    /**
     * @param DeleteAllRequest $request
     * @return JsonResponse
     */
    public function destroyAll(DeleteAllRequest $request): JsonResponse
    {
        Employee::whereIn('id', $request->ids)->delete();
        return successResponse(msg: __('api.deleted_success'));
    }
}