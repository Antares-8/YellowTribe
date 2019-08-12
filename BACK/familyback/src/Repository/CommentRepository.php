<?php

namespace App\Repository;

use App\Entity\Comment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Comment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Comment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Comment[]    findAll()
 * @method Comment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommentRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Comment::class);
    }

    /**
     * Get Comments ordered by updatedAt date
     * 
     *  @return Comment[] Returns an array of Comment objects
     */
    public function findAllOrderedByCreatedAtDate()
    {
        $query = $this->createQueryBuilder('c')
                      ->orderBy('c.createdAt', 'DESC');

        return $query->getQuery()->getResult();
    }

    public function findTribeCommentsByDate($tribe)
    {
        $date = new \DateTime('now'); 
        $date->modify('-10 days');

        $qb = $this->createQueryBuilder('c')
                ->join('c.tribe', 't')
                ->addselect('t')
                ->join('c.event', 'e')
                ->addselect('e')
                ->where('c.tribe = :myTribe')
                ->andWhere('c.createdAt > :date')
                ->setParameters([
                    'myTribe' => $tribe,
                    'date' => $date
                ])
        ;

        return $qb->getQuery()->getArrayResult();
    }
    
    // /**
    //  * @return Comment[] Returns an array of Comment objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Comment
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
