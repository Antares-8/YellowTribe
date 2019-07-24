<?php

/*
    File used to provide fake data 

    Fake data are generate thanks to Faker (PHP library) 
    and our DataProvider (App\DataFixtures\Faker\DataProvider)

    https://github.com/fzaninotto/Faker 

*/

namespace App\DataFixtures;

use Faker;
use Faker\Factory;

use App\Entity\User;
use App\DataFixtures\Faker\DataProvider;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class AppFixtures extends Fixture
{
    
    // TODO: à décommenter quand les User auront la config d'authentification (avec implements UserInterface etc.)
    // to encode the plain password
    // private $passwordEncoder;

    // public function __construct(UserPasswordEncoderInterface $passwordEncoder) 
    // {
    //     $this->passwordEncoder = $passwordEncoder;
    // }


    public function load(ObjectManager $manager)
    {
        $generator = Factory::create('fr_FR');

        // App\DataFixtures\Faker\DataProvider - file with fake data
        $generator->addProvider(new DataProvider($generator));

        $populator = new Faker\ORM\Doctrine\Populator($generator, $manager);

        // ***** User *****
            $fakeUser = new User(); 
            $fakeUser->setFirstname('Barbara');
            $fakeUser->setLastname('Goulde');
            //$fakeUser->setBirthDate(); TODO: 
            $fakeUser->setEmail('barbara.goulde@fake.mail');
            $fakeUser->setUsername('Barbara Goulde');

            $time = new \Datetime;
            $fakeUser->setCreatedAt($time);

            /* 
                'barbiche' is the password of our fake $fakeUser
                encode password brings security to our app 
                there is no need to display a plain password
            */
            // $encodedPassword = $this->passwordEncoder->encodePassword($fakeUser, 'barbiche');
            // $fakeUser->setPassword($encodedPassword);
            $fakeUser->setPassword('barbiche');

            $manager->persist($fakeUser);

        
        // ***** Event *****
            $populator->addEntity('App\Entity\Event', 3, array(
                'title' => function() use ($generator) { return $generator->unique()->eventTitle(); },
                'beginingDate' => function() use ($generator) { return $generator->dateTimeBetween('now', '+2 years'); },
                'endingDate' => function() use ($generator) { return $generator->dateTimeBetween('now', '+2 years'); },
                'createdAt' => function() use ($generator) { return $generator->dateTimeBetween('-1 week', 'now'); },
                'updatedAt' => function() use ($generator) { return $generator->dateTimeBetween('now', '+2 years'); },
                'description' => function() use ($generator) { return $generator->realText(); },
                'place' => function() use ($generator) { return $generator->city(); },
                // 'creator' => function() use ($generator) { return $generator->name(); },
            ));


        // ***** Tribe *****
            $populator->addEntity('App\Entity\Tribe', 5, array (
                'name' => function() use ($generator) { return $generator->lastName(); },
            ));

        // ***** Category *****
            $populator->addEntity('App\Entity\Category', 6, array (
                'title' => function() use ($generator) { return $generator->unique()->categoryTitle(); },
            ));
        
        // ***** Tag *****
            $populator->addEntity('App\Entity\Tag', 6, array (
                'title' => function() use ($generator) { return $generator->unique()->tagTitle(); },
            ));
            
        // ***** Picture *****
            $populator->addEntity('App\Entity\Picture', 2, array (
                'url' => function() use ($generator) { return $generator->url(); },
                'description' => function() use ($generator) { return $generator->realText(); },
                'createdAt' => function() use ($generator) { return $generator->dateTimeBetween('-1 week', 'now'); },
            ));

        // ***** Comment *****
            $populator->addEntity('App\Entity\Comment', 3, array (
                'content' => function() use ($generator) { return $generator->sentence(10); },
                'createdAt' => function() use ($generator) { return $generator->dateTimeBetween('-1 week', 'now'); },
            ));
        
        // ***** Guest *****
            $populator->addEntity('App\Entity\Guest', 15, array (
                'email' => function() use ($generator) { return $generator->email(); },
            ));
            
        $inserted = $populator->execute();
        
        $manager->flush();
    }
}
