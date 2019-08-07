<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, User::class);
    }

    // search users created in the last 10 days
    public function findTribeUsersByDate($tribe) 
    {
        $date = new \DateTime('now'); 
        $date->modify('-10 days');

        $qb = $this->createQueryBuilder('u')
                ->join('u.tribe', 't')
                ->addselect('t')
                ->where('u.tribe = :myTribe')
                ->andWhere('u.createdAt > :date')
                ->setParameters([
                    'myTribe' => $tribe,
                    'date' => $date
                ])
        ;

        return $qb->getQuery()->getArrayResult();
    }

    public function findUserBirthdayByTribe($tribe)
    {
        $qb = $this->createQueryBuilder('u')
            ->select('u.birthDate')
            ->addselect('u.firstname')
            ->addselect('u.lastname')
            ->where('u.tribe = :myTribe')
            ->setParameter('myTribe', $tribe)
        ;

        return $qb->getQuery()->getArrayResult();
    }
    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
