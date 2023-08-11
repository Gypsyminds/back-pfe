package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.models.Problem;

import java.util.List;

public interface IProblem {
    List<Problem> retrieveProblems();
    Problem addProblem(Problem s);
    void deleteProblemById(Long id);
    void deleteProblem(Problem s);
    Problem updateProblem(Problem s);
    Problem retrieveProblemById(Long id);
    public Problem AddTestProb(Problem test, Long testid);
}
