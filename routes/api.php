<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\User\RoleController;
use App\Http\Controllers\API\User\PermissionController;


/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Route::middleware(['auth:sanctum'])->group(function () {

Route::get('settings', [SettingController::class, 'generalSettings']);

     /*
    |--------------------------------------------------------------------------
    | Employee Routes
    |--------------------------------------------------------------------------
    */
    Route::delete('employees/delete-all', [EmployeeController::class, 'destroyAll']);
    Route::apiResource('employees', EmployeeController::class);


      /*
    |--------------------------------------------------------------------------
    | Roles Routes
    |--------------------------------------------------------------------------
    */
      Route::delete('roles/delete-all', [RoleController::class, 'destroyAll']);
      Route::apiResource('roles', RoleController::class);
      Route::apiResource('permissions', PermissionController::class);


// });