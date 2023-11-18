package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.Repositery.Certif_testRepository;
import com.bezkoder.springjwt.Repositery.ProblemRepository;
import com.bezkoder.springjwt.models.Certif_test;
import com.bezkoder.springjwt.models.Problem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProblemService implements IProblem {
    @Autowired
    ProblemRepository problemRepository;
@Autowired
Certif_testRepository certif_testRepository;
    @Override
    public List<Problem> retrieveProblems() {
        return (List<Problem>) problemRepository.findAll();
    }

    @Override
    public Problem addProblem(Problem s) {
        s.setDate_start(LocalDateTime.now());
        return problemRepository.save(s);
    }

    @Override
    public void deleteProblemById(Long id) {
        problemRepository.deleteById(id);

    }

    @Override
    public void deleteProblem(Problem s) {
        problemRepository.delete(s);
    }

    @Override
    public Problem updateProblem(Problem s) {
        return problemRepository.save(s);
    }

    @Override
    public Problem retrieveProblemById(Long id) {
        return problemRepository.findById(id).get();
    }

    @Override
    public Problem AddTestProb(Problem test, Long testid) {

        Certif_test dep = certif_testRepository.findById(testid).orElse(null);


     //   test.setCertif(dep);
        return  problemRepository.save(test);

    }
}
