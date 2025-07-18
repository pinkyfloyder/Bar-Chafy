use App\Http\Controllers\UserController;
Route::middleware('auth:sanctum')->put('/user', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->put('/user/password', [UserController::class, 'updatePassword']);
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::any('/test', function () {
    return response()->json(['ok' => true]);
});
