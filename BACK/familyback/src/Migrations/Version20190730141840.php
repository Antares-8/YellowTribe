<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190730141840 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE app_user (id INT AUTO_INCREMENT NOT NULL, tribe_id INT DEFAULT NULL, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, username VARCHAR(100) NOT NULL, birth_date DATETIME DEFAULT NULL, password VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_88BDF3E96F3EE0AD (tribe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, event_id INT DEFAULT NULL, user_id INT DEFAULT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_9474526C71F7E88B (event_id), INDEX IDX_9474526CA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, user_id INT DEFAULT NULL, tribe_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, begining_date DATETIME NOT NULL, ending_date DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, description LONGTEXT DEFAULT NULL, place VARCHAR(255) DEFAULT NULL, INDEX IDX_3BAE0AA712469DE2 (category_id), INDEX IDX_3BAE0AA7A76ED395 (user_id), INDEX IDX_3BAE0AA76F3EE0AD (tribe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_tag (event_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_1246725071F7E88B (event_id), INDEX IDX_12467250BAD26311 (tag_id), PRIMARY KEY(event_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE guest (id INT AUTO_INCREMENT NOT NULL, tribe_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL, INDEX IDX_ACB79A356F3EE0AD (tribe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag (id INT AUTO_INCREMENT NOT NULL, tribe_id INT DEFAULT NULL, title VARCHAR(100) NOT NULL, INDEX IDX_389B7836F3EE0AD (tribe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tribe (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE picture (id INT AUTO_INCREMENT NOT NULL, event_id INT DEFAULT NULL, url VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_16DB4F8971F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE app_user ADD CONSTRAINT FK_88BDF3E96F3EE0AD FOREIGN KEY (tribe_id) REFERENCES tribe (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C71F7E88B FOREIGN KEY (event_id) REFERENCES event (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA712469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7A76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA76F3EE0AD FOREIGN KEY (tribe_id) REFERENCES tribe (id)');
        $this->addSql('ALTER TABLE event_tag ADD CONSTRAINT FK_1246725071F7E88B FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event_tag ADD CONSTRAINT FK_12467250BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE guest ADD CONSTRAINT FK_ACB79A356F3EE0AD FOREIGN KEY (tribe_id) REFERENCES tribe (id)');
        $this->addSql('ALTER TABLE tag ADD CONSTRAINT FK_389B7836F3EE0AD FOREIGN KEY (tribe_id) REFERENCES tribe (id)');
        $this->addSql('ALTER TABLE picture ADD CONSTRAINT FK_16DB4F8971F7E88B FOREIGN KEY (event_id) REFERENCES event (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA712469DE2');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CA76ED395');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7A76ED395');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C71F7E88B');
        $this->addSql('ALTER TABLE event_tag DROP FOREIGN KEY FK_1246725071F7E88B');
        $this->addSql('ALTER TABLE picture DROP FOREIGN KEY FK_16DB4F8971F7E88B');
        $this->addSql('ALTER TABLE event_tag DROP FOREIGN KEY FK_12467250BAD26311');
        $this->addSql('ALTER TABLE app_user DROP FOREIGN KEY FK_88BDF3E96F3EE0AD');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA76F3EE0AD');
        $this->addSql('ALTER TABLE guest DROP FOREIGN KEY FK_ACB79A356F3EE0AD');
        $this->addSql('ALTER TABLE tag DROP FOREIGN KEY FK_389B7836F3EE0AD');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE app_user');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE event_tag');
        $this->addSql('DROP TABLE guest');
        $this->addSql('DROP TABLE tag');
        $this->addSql('DROP TABLE tribe');
        $this->addSql('DROP TABLE picture');
    }
}
