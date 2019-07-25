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

    protected static $categories = [
        'Anniversaires',
        'Repas',
        'Retrouvailles',
        'Mariage',
        'Cinéma',
        'Fête'
    ];

    protected static $tags = [
        'Jean-Jérôme',
        'Carlos',
        'Denis',
        'Mariage des voisins',
        'John',
        'Martha'
    ];

    public static function eventTitle(){
        return static::randomElement(static::$events);
    }

    public static function categoryTitle(){
        return static::randomElement(static::$categories);
    }

    public static function tagTitle(){
        return static::randomElement(static::$tags);
    }
}