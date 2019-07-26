<?php

namespace App\Controller;

use App\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


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
    public function edit(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $user = $this->getUser(); // authenticate User

        $form = $this->createForm(UserType::class, $user);

        $oldPassword = $user->getPassword();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if(!is_null($user->getPassword())){

                $encodedPassword = $passwordEncoder->encodePassword(
                    $user, 
                    $user->getPassword() 
               );
               
            } else { 
                $encodedPassword = $oldPassword;
            }

            $user->setPassword($encodedPassword);

            $this->getDoctrine()->getManager()->flush();

            $this->addFlash(
                'success',
                'Informations modifiées'
            );

            return $this->redirectToRoute('profile_index');
        }

        return $this->render('profile/edit.html.twig', [
            'title' => 'Modifer mes informations',
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }
}
