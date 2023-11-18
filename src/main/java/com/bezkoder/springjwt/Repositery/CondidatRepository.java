package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CondidatRepository extends CrudRepository<User,Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query(value = "select image from user where id_condidat= :id_condidat ", nativeQuery=true)
    Long findRandoms(@Param("id_condidat") long id_condidat);
}
