<?php

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
        // $product = new Product();
        // $manager->persist($product);

        $manager->flush();

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
