package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.Repositery.ProblemRepository;
import com.bezkoder.springjwt.Services.IProblem;
import com.bezkoder.springjwt.models.Problem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "prob")
public class ProblemControlleur {
    @Autowired
    IProblem iProblem;
    @Autowired
    ProblemRepository problemRepository;



    @PostMapping(value = "/add-Prob")
    public Problem addProb(@RequestBody Problem s) {
        return iProblem.addProblem(s);

    }

    @DeleteMapping(value = "/delete-Prob/{id}")
    void deleteProbById(@PathVariable Long id) {
        Problem qcm = iProblem.retrieveProblemById(id);
        if(LocalDateTime.now().minusSeconds(5L).isAfter(qcm.getDate_start()))
            iProblem.deleteProblemById(id);
    }

    @DeleteMapping(value = "/delete-Prob")
    void deleteProb(@RequestBody Problem s) {
        iProblem.deleteProblem(s);
    }

    @GetMapping(value ="/showall")
    public List<Problem> retrieveAllProb() {
        return iProblem.retrieveProblems();
    }

    @GetMapping(value ="/showProb/{id}")
    public Problem retriveProb(@PathVariable Long id) {
        return iProblem.retrieveProblemById(id);
    }

    @PostMapping(value ="/AddTest/{testid}")
    public Problem AddTest(@RequestBody Problem test, @PathVariable Long testid) {
        return iProblem.AddTestProb(test,testid);
    }
    @GetMapping(value="/prob/{certif_id_test}")
    public List<Problem> getRanQcm(@PathVariable Long certif_id_test){

        return problemRepository.findRandom(certif_id_test );
    }


}
