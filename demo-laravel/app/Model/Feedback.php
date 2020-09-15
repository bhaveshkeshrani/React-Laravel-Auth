<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = 'feedback';
    protected $primaryKey = 'fid';
    public $timestamps = false;
    
    protected $fillable = [
        'FullName', 'Email', 'Message',
    ];

    public static function saveData($request)
    {
        $data = Feedback::create([
            'FullName' => $request->fname,
            'Email' => $request->email,
            'Message' => $request->message
        ]);
        return $data;
    }

    public static function updateData($request)
    {
        Feedback::where('fid', $request->fid)->update(
            [
                'FullName' => $request->fname,
                'Email' => $request->email,
                'Message' => $request->message
            ]
        );
        return true;
    }
}
