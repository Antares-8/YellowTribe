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
     * @Route("/edit", name="edit", methods={"GET", "POST"})
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

            // Before saving new informations, we have to get the avatar file
            $file = $user->getAvatar();
            
            if(!is_null($user->getPoster())){

                // Generating an unique file name in order not to crush another file, and concatenating with the extention of the origin file

                $fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();

                try {

                    // Moving the file into the right directory (configured in services.yaml)
                    $file->move(
                        $this->getParameter('avatar_directory'),
                        $fileName
                    );
                } catch (FileException $e) {
                    dump($e);
                }

                $user->setAvatar($fileName);
            }

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
