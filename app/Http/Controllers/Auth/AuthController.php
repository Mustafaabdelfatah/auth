<?php

namespace App\Http\Controllers\Auth;

use App\Models\Merchant;
use Illuminate\Http\JsonResponse;
 use App\Http\Controllers\Controller;
use App\Services\Auth\AuthService;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\Auth\LoginResource;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Handle dynamic login.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(LoginRequest $request): JsonResponse
    {

        $user = $this->authService
        ->setGuard("api")
        ->setModel(Merchant::class)
        ->attempt($request);

        return successResponse(new LoginResource($user['user'], $user['token']), __('api.login_success'));
    }

    /**
     * Handle dynamic registration.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService
            ->setGuard("api")
            ->setModel(Merchant::class)
            ->register($request);

        return successResponse(new LoginResource($user['user'], $user['token']), __('api.register_success'));
    }
}