<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    // Actualizar perfil
    public function update(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
        ]);
        $user->update($data);
        return response()->json(['user' => $user]);
    }

    // Cambiar contraseña
    public function updatePassword(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|string|min:6',
        ]);
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['errors' => ['old_password' => ['La contraseña actual es incorrecta.']]], 422);
        }
        $user->password = Hash::make($request->new_password);
        $user->save();
        return response()->json(['message' => 'Contraseña actualizada correctamente.']);
    }
}
