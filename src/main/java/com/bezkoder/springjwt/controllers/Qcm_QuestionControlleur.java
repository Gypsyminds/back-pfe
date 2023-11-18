package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.Repositery.*;
import com.bezkoder.springjwt.Services.*;
import com.bezkoder.springjwt.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/qcm")
public class Qcm_QuestionControlleur {
    @Autowired
    pdfRepository pdfrep ;
    @Autowired
    IQuestion_qcm iQuestion_qcm;
    @Autowired
    Iinscriptioncour icour;
    @Autowired
    ICondidat icondidat;
    @Autowired
    Question_qcmRepository question_qcmRepository;
    @Autowired
    CertificationRepository certificationRepository;
    @Autowired
    Certif_testRepository certifrepo;
@Autowired
    EmailService emailservice ;
    @Autowired
    inscricour icours;
    @Autowired
    IPdf pdf ;
    @PostMapping(value = "/add-Qcm")
    public Question_qcm addQcm(@RequestBody Question_qcm s) {
        return iQuestion_qcm.addQcm(s);

    }

    @PostMapping("/uploads")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            pdf.store(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }
    @DeleteMapping(value = "/delete-Qcm/{id}")
    void deleteQcmById(@PathVariable Long id) {
        Question_qcm qcm = iQuestion_qcm.retrieveQcmById(id);
        //if(LocalDateTime.now().minusSeconds(1L).isAfter(qcm.getDate_start()))
            iQuestion_qcm.deleteQcmById(id);
    }

    @DeleteMapping(value = "/delete-Qcm")
    void deleteQcm(@RequestBody Question_qcm s) {
        iQuestion_qcm.deleteQcm(s);
    }

    //@GetMapping(value ="/showall")
    //public List<Question_qcm> retrieveAllQcm() {
    //    return iQuestion_qcm.retrieveAllQcm();
   // }

    @GetMapping(value ="/showqcm/{id}")
    public Question_qcm retriveQcm(@PathVariable Long id) {

        return iQuestion_qcm.retrieveQcmById(id);
    }

    @PostMapping(value ="/AddTest/{testid}")
    public Question_qcm AddTest(@RequestBody Question_qcm test,@PathVariable Long testid) {
        return iQuestion_qcm.AddTest(test,testid);
    }

    @PostMapping(value ="/inscrit/{courid}/{user}")
    public inscriptioncour AddTests(@RequestBody inscriptioncour inscrit,@PathVariable Long courid,@PathVariable Long user) {
        return icour.AddTests(inscrit,courid,user);
    }
    @PostMapping(value="/mail/{idinscrit}")
    public void ajoutermail(@PathVariable Long idinscrit){
        //inscriptioncour inscrit = new inscriptioncour();
        inscriptioncour inscrit = icours.findById(idinscrit).orElse(null);
        File  files = pdfrep.findById(inscrit.getCours().getFilepdf()).orElse(null);
        String to = inscrit.getEmail();
        String subject = "Support du cour ";
        String body =  " Bonjour " +inscrit.getNom()+ "\n  vous etes inscrit au cour "+ inscrit.getCours().getCourstitel() ;
       // MimeMessageHelper helper = new MimeMessageHelper(message, true);

      //  helper.addAttachment("file.pdf", new ByteArrayResource(pdfData));
        emailservice.sendEmail(to, subject, body);

    }

    @GetMapping("/sendPdfByEmail")
    public ResponseEntity<String> sendPdfByEmail() {
        // Récupérer le fichier PDF depuis la base de données
        inscriptioncour inscrit = icours.idinscitcour();

        byte[] pdfData = pdfrep.findById(inscrit.getCours().getFilepdf()).orElse(null).getPic(); // Remplacez 1L par l'ID du fichier PDF souhaité

        // Envoyer le fichier PDF par e-mail
        emailservice.sendPdfByEmails(inscrit.getEmail(), "Confirmation d'inscription au cours et envoi du support de cours",
                "Cher(e)"+inscrit.getNom()+"\n Nous sommes ravis de vous informer que votre inscription au cours "+inscrit.getCours().getCourstitel()+" a été confirmée avec succès. Nous sommes impatients de vous accueillir dans notre programme de formation et de vous accompagner dans votre parcours d'apprentissage.\n"
                        +
                        "\n" +
                        "Pour vous assurer une expérience d'apprentissage fluide et productive, nous avons préparé le support de cours complet qui vous sera indispensable tout au long de votre formation. Vous trouverez ci-joint le support de cours au format pdf . \n ", pdfData );

        return ResponseEntity.ok("E-mail envoyé avec succès.");
    }

    @GetMapping(value="/qcm/{certif_id_test}")
    public List<Question_qcm> getRanQcm(@PathVariable Long certif_id_test){
        Long courseIds =  certifrepo.CourId(certif_id_test);
        return question_qcmRepository.findRandom(courseIds);
    }
  //  @GetMapping(value="score/{qcm}")
    //public Long calculescore(@PathVariable Long qcm){

      //  Long socors = question_qcmRepository.score(qcm);
        //return socors ;

  //  }
   // @PostMapping(value="AddFile/{qcm}/{certif}")
    //public String Addfile(@RequestBody String reponse ,@PathVariable Long qcm ,@PathVariable Long certif) throws IOException {
       // Question_qcm qcms = question_qcmRepository.findById(qcm).orElse(null);
       //Certification certifs = certificationRepository.findById(certif).orElse(null);

        //FileWriter fileWriter = new FileWriter(qcms.getCertif().getTest_title()+certifs.getCondidat().getId());
        //fileWriter.write("Question : ");
        //fileWriter.write(String.valueOf(qcm));
        //fileWriter.write("--------- ");
        //fileWriter.write("Réponse : ");
        //fileWriter.write(reponse.toString());
        //fileWriter.write("--------- ");
        //fileWriter.write("\n");
        //fileWriter.close();
         //return "123";
   // }
    @PostMapping(value="AddFile/{qcm}/{certif}")
    public String Addfile(@RequestBody String reponse ,@PathVariable Long qcm ,@PathVariable Long certif) throws IOException {
        Question_qcm qcms = question_qcmRepository.findById(qcm).orElse(null);
        Certification certifs = certificationRepository.findById(certif).orElse(null);
        // Long socors = question_qcmRepository.score(qcms.getCertif().getId_test());

        FileWriter fileWriter = new FileWriter(certifs.getCondidat().getId().toString()+certifs.getCertif_test().getTest_title(),true);
        fileWriter.write("Question : ");
        fileWriter.write(qcm.toString());      fileWriter.write("--------- ");
        fileWriter.write("Réponse : ");
        fileWriter.write(reponse.toString());
        fileWriter.write("--------- ");


        fileWriter.write("\n");
        fileWriter.close();
        return "123";

    }

    @GetMapping("/file-content")
    public String getFileContent() throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("1java.txt");
        String fileContent = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
        return fileContent;
    }

        //@GetMapping("/qrcode")
    //    public ResponseEntity<byte[]> generateQRCode(@RequestParam("text") String text) throws IOException, WriterException {

      //      QRCodeWriter qrCodeWriter = new QRCodeWriter();

     //       BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 200, 200);
       //     ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
       //     MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
       //     byte[] bytes = outputStream.toByteArray();
     //       HttpHeaders headers = new HttpHeaders();
      //      headers.setContentType(MediaType.IMAGE_PNG);
      //      return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
     //   }


    @GetMapping("/pdf/{fileName:.+}")
    public ResponseEntity<Resource> getPdf(@PathVariable String fileName) throws IOException {
        Resource resource = new ClassPathResource("static/pdf" + fileName);

        if (resource.exists()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + fileName);
            headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");
            return new ResponseEntity<>(resource, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/api/static")
    public ResponseEntity<byte[]> getPdf() throws IOException {
        ClassPathResource pdfFile = new ClassPathResource("static/use.pdf");
        byte[] bytes = StreamUtils.copyToByteArray(pdfFile.getInputStream());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "use.pdf");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }




}
