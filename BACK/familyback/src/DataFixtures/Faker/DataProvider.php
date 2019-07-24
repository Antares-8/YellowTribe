<?php

namespace App\DataFixtures\Faker;

class DataProvider extends \Faker\Provider\Base
{
    protected static $events = [
        'Cousinade aux Seychelles',
        'Barbecue chez Denis',
        'Garder Carlos le chat SVP',
        'Brocante des familles'
    ];


    public static function eventTitle(){
        return static::randomElement(static::$events);
    }
}