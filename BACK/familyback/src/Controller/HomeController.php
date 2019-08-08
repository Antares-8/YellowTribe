<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * TODO: formulaire de connexion + POST (2ème method?)
     * @Route("/", name="homepage", methods={"GET"})
     */
    public function index()
    {
        // if (user is connected ) {
        //    redirection vers /calendar 
        // }


        return $this->render('home/index.html.twig', [
            'title' => 'Welcome !',
        ]);
    }

    /**
     * @Route("/contact-us", name="contact_us", methods={"GET"})
     */
    public function contact()
    {
        return $this->render('home/contact.html.twig', [
            'title' => "Nous contacter",
        ]);
    }

    /**
     * @Route("/legal-mention", name="legal_mention", methods={"GET"})
     */
    public function legalMention()
    {
        return $this->render('home/legal-mention.html.twig', [
            'title' => "Mentions légales",
        ]);
    }

}
