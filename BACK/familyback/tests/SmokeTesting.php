<?php

/**
 * cf : https://symfony.com/doc/current/best_practices/tests.html
 */

namespace App\Tests;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
class SmokeTesting extends WebTestCase
{
    /**
     * Pages accessibles en lecture pour un user anonyme
     *
     * @dataProvider urlProvider
     */
    public function testPageIsSuccessful($url)
    {
        $client = self::createClient();
        $client->request('GET', $url);
        $this->assertTrue($client->getResponse()->isSuccessful());
    }
    public function urlProvider()
    {
        yield ['/'];
        yield ['/login'];
        yield ['/contact-us'];
        yield ['/legal-mention'];
    }

    /**
     * Pages non accessibles en lecture pour un user anonyme
     *
     * @dataProvider urlProviderAnonRedirect
     */
    public function testPageIsRedirect($url)
    {
        $client = self::createClient();
        $client->request('GET', $url);
        $this->assertTrue($client->getResponse()->isRedirect());
    }

    public function urlProviderAnonRedirect()
    {
        yield ['/logout'];
        yield ['/calendar'];
        yield ['/calendar/event/new'];
        yield ['/profile'];
        yield ['/profile/edit'];
        yield ['/profile/avatar/edit'];
        yield ['/tribe/invitation'];
        yield ['/picture'];
        yield ['/picture/new'];
        yield ['/signup'];
        yield ['/tribe'];
        yield ['/tribe/new'];
        yield ['/picture'];
    }
    
//     /**
//      * Pages accessibles en lecture pour un user ROLE_USER
//      *
//      * @dataProvider urlProviderRoleUserSuccess
//      */
//     public function testPageIsSuccessfulRoleUser($url)
//     {
//         // Auth, cf : https://symfony.com/doc/current/testing/http_authentication.html
//         $client = static::createClient([], [
//             'PHP_AUTH_USER' => 'user',
//             'PHP_AUTH_PW'   => 'user',
//         ]);
//         $client->request('GET', $url);
//         $this->assertTrue($client->getResponse()->isSuccessful());
//     }
//     public function urlProviderRoleUserSuccess()
//     {
//         yield ['/backend/movie/'];
//         // @todo s'assurer que cet id existe tjrs OU mettre des slugs dans le backend
//         yield ['/backend/movie/31'];
//         // Idem pour les autres URLs du back
//         // ...
//     }
//     /**
//      * Pages non accessibles en lecture pour un user ROLE_USER
//      *
//      * @dataProvider urlProviderRoleUserIsForbidden
//      */
//     public function testPageIsForbiddenRoleUser($url)
//     {
//         // Auth, cf : https://symfony.com/doc/current/testing/http_authentication.html
//         $client = static::createClient([], [
//             'PHP_AUTH_USER' => 'user',
//             'PHP_AUTH_PW'   => 'user',
//         ]);
//         $client->request('GET', $url);
//         $this->assertTrue($client->getResponse()->isForbidden());
//     }
//     public function urlProviderRoleUserIsForbidden()
//     {
//         yield ['/backend/movie/new'];
//         // @todo s'assurer que cet id existe tjrs OU mettre des slugs dans le backend
//         yield ['/backend/movie/31/edit'];
//         // Idem pour les autres URLs du back
//         // ...
//     }
//     /**
//      * @todo : idem pour le user Admin
//      */
}