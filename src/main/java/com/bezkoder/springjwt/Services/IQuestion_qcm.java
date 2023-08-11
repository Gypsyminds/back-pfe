package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.models.Question_qcm;

import java.util.List;

public interface IQuestion_qcm {
    List<Question_qcm> retrieveAllQcm();
    Question_qcm addQcm(Question_qcm s);
    void deleteQcmById(Long id);
    void deleteQcm(Question_qcm s);
    Question_qcm updateQcm(Question_qcm s);
    Question_qcm retrieveQcmById(Long id);
    Question_qcm AddTest(Question_qcm test, Long testid);
    public  Question_qcm NextQcm (long idtest , long idqcm);
}
