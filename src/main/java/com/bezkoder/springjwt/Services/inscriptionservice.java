package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.Repositery.CourseRepository;
import com.bezkoder.springjwt.Repositery.UserRepository;
import com.bezkoder.springjwt.Repositery.inscricour;
import com.bezkoder.springjwt.Repositery.pdfRepository;
import com.bezkoder.springjwt.models.Course;
import com.bezkoder.springjwt.models.inscriptioncour;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class inscriptionservice implements Iinscriptioncour{
    @Autowired
    inscricour icour;
    @Autowired
    CourseRepository icourse;
    @Autowired
    EmailService malservice;
    @Autowired
    pdfRepository pdfrep ;
    @Autowired
    UserRepository userRepository;
    @Override
    public inscriptioncour AddTests(inscriptioncour inscrit, Long courid,Long user) {
        //User users = userRepository.findById(user).orElse(null);
        Course cour = icourse.findById(courid).orElse(null);
      //  inscrit.getCours().setId_course(courid);
       inscrit.setCours(cour);
       inscrit.setUser(user);
        byte[] pdfData = pdfrep.findById(inscrit.getCours().getFilepdf()).orElse(null).getPic(); // Remplacez 1L par l'ID du fichier PDF souhaité

        // Envoyer le fichier PDF par e-mail
        malservice.sendPdfByEmails(inscrit.getEmail(), "Confirmation d'inscription au cours et envoi du support de cours",
                "Cher(e)  "+inscrit.getNom()+"\n Nous sommes ravis de vous informer que votre inscription au cours "+cour.getCourstitel()+" a été confirmée avec succès Nous sommes impatients de vous accueillir dans notre programme de formation et de vous accompagner dans votre parcours d'apprentissage. Pour vous assurer une expérience d'apprentissage fluide et productive, nous avons préparé le support de cours complet qui vous sera indispensable tout au long de votre formation. Vous trouverez ci-joint le support de cours au format pdf . \n ", pdfData );
       //malservice.sendPdfByEmail();
        return  icour.save(inscrit);
    }





}
