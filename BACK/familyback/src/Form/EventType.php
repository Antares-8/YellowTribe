<?php

namespace App\Form;

use App\Entity\Event;
use App\Entity\Category;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\Count;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class EventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'empty_data' => '',
                'constraints' => [
                    new NotBlank(),
                ],
                'label' => 'Titre de l\'événement'
            ])
            ->add('beginingDate', DateTimeType::class, [
                'label' => 'Début de l\'événement',
                'widget' => 'choice',
                'placeholder' => [
                    'year' => 'Année', 'month' => 'Mois', 'day' => 'Jour',
                    'hour' => 'Heure',
                ],
                'with_minutes' => false,
                'years' => range(2019, 2099),
            ])
            ->add('endingDate', DateTimeType::class, [
                'required' => false,
                'label' => 'Optionnel: définir la date de fin de l\'événement',
                'widget' => 'choice',
                'placeholder' => [
                    'year' => 'Année', 'month' => 'Mois', 'day' => 'Jour',
                    'hour' => 'Heure',
                ],
                'with_minutes' => false,
                'years' => range(2019, 2099),
            ])
            ->add('description', TextareaType::class, [
                'empty_data' => '',
                'constraints' => [
                    new NotBlank(),
                ],
                'label' => false,
                'attr' => array(
                    'placeholder' => 'Ajoutez une description à votre événement ...'
                ),
            ])
            ->add('place', TextType::class, [
                'label' => 'Où ?',
                'empty_data' => '',
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'choice_label' => 'title',
                'label' => 'Choisir une catégorie',
                'multiple' => false,
                'placeholder' => 'Choisir',
            ])
            //->add('tags') will be add in detailed event
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Event::class,
        ]);
    }
}
