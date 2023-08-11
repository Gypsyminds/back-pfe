package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.List_condidat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface List_CondidatRepository extends CrudRepository<List_condidat,Long> {
}
