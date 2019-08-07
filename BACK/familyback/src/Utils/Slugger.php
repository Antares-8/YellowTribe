<?php

namespace App\Utils;

// We want to create un slug in order not to see the event id in URL
// slugify('hello world') => doit renvoyer hello-world 

class Slugger
{
    public function slugify($strToConvert) 
    {
        $strConverted = preg_replace( '/[^a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*/', '-', strtolower(trim(strip_tags($strToConvert))) );
        return $strConverted;
    }

}