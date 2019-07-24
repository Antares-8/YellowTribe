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

    // to encode the plain password
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder) 
    {
        $this->passwordEncoder = $passwordEncoder;
    }


    public function load(ObjectManager $manager)
    {
        // $generator = Factory::create('fr_FR');

        // App\DataFixtures\Faker\DataProvider - file with fake data
        // $generator->addProvider(new DataProvider($generator));

        // $populator = new Faker\ORM\Doctrine\Populator($generator, $manager);

        // ***** User *****
            $user = new User(); 
            $user->setFirstname('Barbara');
            $user->setLastname('Goulde');
            //$user->setBirthDate(); // TODO: 
            $user->setEmail('barbara.goulde@fake.mail');

            $time = new \Datetime;
            $user->setCreatedAt($time);

            /* 
                'barbiche' is the password of our fake $user
                encode password brings security to our app 
                there is no need to display a plain password
            */
            $encodedPassword = $this->passwordEncoder->encodePassword($user, 'barbiche');
            $user->setPassword($encodedPassword);

            $manager->persist($user);

            
            
        // TODO: Event
        
        // TODO: Group
        
        // TODO: Category
        
        // TODO: Tag (= family members)
        
        // TODO: Picture
        
        // TODO: Comment
        
        // TODO: Guest
        
        $manager->flush();
    }
}
