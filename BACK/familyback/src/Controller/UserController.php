<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/profile", name="profile_")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index()
    {
        return $this->render('profile/index.html.twig', [
            'title' => 'Mon profil',
        ]);
    }

    /**
     * @Route("/profile/edit", name="edit", methods={"GET", "POST"})
     */
    public function edit()
    {
        $user = $this->getUser();

        
    }
}
