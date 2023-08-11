package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.Repositery.Certif_testRepository;
import com.bezkoder.springjwt.Repositery.ProblemRepository;
import com.bezkoder.springjwt.Repositery.Question_qcmRepository;
import com.bezkoder.springjwt.models.Certif_test;
import com.bezkoder.springjwt.models.Question_qcm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Question_qcmService implements IQuestion_qcm{
    @Autowired
    Question_qcmRepository iQuestion_qcm;
    @Autowired
    Certif_testRepository certif_testRepository;

    @Autowired
    ProblemRepository problemRepository;

    private Certif_test certif_test;

    @Override
    public List<Question_qcm> retrieveAllQcm() {
       return (List<Question_qcm>) iQuestion_qcm.findAll();
   }

    @Override
    public Question_qcm addQcm(Question_qcm s) {
    //    s.setDate_start(LocalDateTime.now());
        return iQuestion_qcm.save(s);
    }

    @Override
    public void deleteQcmById(Long id) {
        iQuestion_qcm.deleteById(id);

    }

    @Override
    public void deleteQcm(Question_qcm s) {
        iQuestion_qcm.delete(s);
    }

    @Override
    public Question_qcm updateQcm(Question_qcm s) {
        return iQuestion_qcm.save(s);
    }

    @Override
    public Question_qcm retrieveQcmById(Long id) {
        return iQuestion_qcm.findById(id).get();
    }

    @Override
    public Question_qcm AddTest(Question_qcm test, Long testid) {

        Certif_test dep = certif_testRepository.findById(testid).orElse(null);

 //       test.setCertif_testSet(dep);
        return  iQuestion_qcm.save(test);

    }

    @Override
    public  Question_qcm NextQcm (long idtest , long idqcm) {
        List<Question_qcm> list = iQuestion_qcm.findRandom(idtest);
        Question_qcm qcm = iQuestion_qcm.findById(idqcm).orElse(null);

        //   for (int i = 0; i< 100; i++){
      //  if (LocalDateTime.now().minusSeconds(1L).isAfter(qcm.getDate_start())) {

            //     }
            //}
            //return null;
            //}



        return qcm;
    }
    }