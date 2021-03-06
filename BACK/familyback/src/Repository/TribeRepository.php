<?php

namespace App\Repository;

use App\Entity\Tribe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Tribe|null find($id, $lockMode = null, $lockVersion = null)
 * @method Tribe|null findOneBy(array $criteria, array $orderBy = null)
 * @method Tribe[]    findAll()
 * @method Tribe[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TribeRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Tribe::class);
    }

    // /**
    //  * @return Tribe[] Returns an array of Tribe objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Tribe
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
