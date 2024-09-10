<?php
namespace App\Services\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use App\Exceptions\InvalidEmailAndPasswordCombinationException;

class AuthService
{

    private string $model;

    private string $guard;

    /**
     * @throws InvalidEmailAndPasswordCombinationException
     */
    public function attempt(Request $request): array
    {
        $user = $this->getModel()
            ->query()
            ->where('email', $request->email)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw new InvalidEmailAndPasswordCombinationException(__('api.invalid_email_and_password'));
        }

        if ($user->tokens()->count() > 0) {
            $user->tokens()->delete();
        }

        $this->setLastLogin($user);

        return [
            'user'  => $user,
            'token' => $user->createToken($this->getGuard())->plainTextToken
        ];
    }

    /**
     * Register a new user and return the user and its token.
     *
     * @param Request $request
     * @return array
     */
    public function register(Request $request): array
    {
        $user = $this->getModel()->create([
            'name'      => $request->name,
            'email'     => $request->email,
            'phone'     => $request->phone,
            'password'  => bcrypt($request->password),
            'is_active' => true,
        ]);

        $this->setLastLogin($user);

        return [
            'user'  => $user,
            'token' => $user->createToken($this->getGuard())->plainTextToken
        ];
    }
    /**
     * @param  String $model
     * @return $this
     */
    public function setModel(String $model): self
    {
        $this->model = $model;
        return $this;
    }

    /**
     * @return Model
     */
    public function getModel(): Model
    {
        return new $this->model();
    }

    /**
     * @param  String $guard
     * @return $this
     */
    public function setGuard(String $guard): self
    {
        $this->guard = $guard;
        return $this;
    }

    /**
     * @return String
     */
    public function getGuard(): String
    {
        return $this->guard;
    }

    /**
     * @param  $user
     * @return bool
     */
    public function setLastLogin($user): bool
    {
        return $user->update(['last_login' => now()]);
    }
}