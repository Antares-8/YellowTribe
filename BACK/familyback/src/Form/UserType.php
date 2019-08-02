<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\BirthdayType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lastname', TextType::class, [
                'empty_data' => '',
                'label' => 'Nom *',
                'constraints' => [
                    new NotBlank(),
                    new Length([
                        'min' => 2,
                        'max' => 32,
                        'minMessage' => 'Pas assez de catactères (min attendu: {{ limit }}',
                        'maxMessage' => 'Trop de caractères (max attendu : {{ limit }}',
                    ])
                ],
                'required' => true,
            ])
            ->add('firstname', TextType::class, [
                'empty_data' => '',
                'label' => 'Prénom *',
                'constraints' => [
                    new NotBlank(),
                    new Length([
                        'min' => 2,
                        'max' => 32,
                        'minMessage' => 'Pas assez de catactères (min attendu: {{ limit }}',
                        'maxMessage' => 'Trop de caractères (max attendu : {{ limit }}',
                    ])
                ],
                'required' => true,
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email *',
                'help' => 'L\'adresse email est utilisée comme identifiant de connexion',
                'required' => true,
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Les champs "Mot de passe" ne sont pas identiques',
                'options' => ['attr' => ['class' => 'password-field']],
                'required' => true,

                'first_options'  => ['label' => 'Mot de passe *'],
                'second_options' => ['label' => 'Vérification du mot de passe *'],
            ])
            ->add('username', TextType::class, [
                'empty_data' => '',
                'required' => true,
                'label' => 'Nom d\'utilisateur *',
                'constraints' => [
                    new NotBlank(),
                    new Length([
                        'min' => 2,
                        'max' => 32,
                        'minMessage' => 'Pas assez de catactères (min attendu: {{ limit }}',
                        'maxMessage' => 'Trop de caractères (max attendu : {{ limit }}',
                    ])
                ]
            ])
            ->add('birthDate', BirthdayType::class, [
                'label' => 'Anniversaire',
                'placeholder' => [
                    'year' => 'Année', 'month' => 'Mois', 'day' => 'Jour',
                ],
                'required' => false,
            ])
            ->add('avatar', FileType::class, [
                'label' => 'Photo de profil (jpg,png,pdf,gif)',
                'required' => false,
            ])
            //->add('createdAt')
            //->add('tribe')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'attr' => ['novalidate' => 'novalidate']
        ]);
    }
}
