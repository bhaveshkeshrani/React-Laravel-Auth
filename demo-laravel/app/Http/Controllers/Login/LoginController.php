<?php

namespace App\Http\Controllers\Login;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login()
    {
        $data['msg']="Yes";
        // return $data;
        return json_encode($data);
    }
}
