<?php

namespace App\Form;

use App\Entity\Tribe;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class TribeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, [
                'empty_data' =>'',
                'constraints' => [
                    new NotBlank(),
                    new Length([
                        'min' => 3,
                        'max' => 100,
                        'minMessage' => 'Nom de tribu trop court (minimum {{ limit }} caractères.)',
                        'maxMessage' => 'Nom de tribu trop long (maximum {{ limit }} caractères)',
                    ])
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Tribe::class,
            'attr' => ['novalidate' => 'novalidate'] # removes validation of the browser (usefull in dev to check symfo's contraints work)
        ]);
    }
}
