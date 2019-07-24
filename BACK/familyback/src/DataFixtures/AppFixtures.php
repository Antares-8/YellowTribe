<?php

/*
    File used to provide fake data 

    Fake data are generate thanks to Faker (PHP library)

    https://github.com/fzaninotto/Faker 

*/

namespace App\DataFixtures;

use Faker;
use Faker\Factory;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\DataFixtures\Faker\DataProvider;


class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $generator = Factory::create('fr_FR');

        // App\DataFixtures\Faker\DataProvider
        $generator->addProvider(new DataProvider($generator));

        //$manager->flush();

        // TODO: User

        // TODO: Event

        // TODO: Group

        // TODO: Catégory

        // TODO: Tag (= family members)

        // TODO: Picture

        // TODO: Comment

        // TODO: Guest
    }
}
