package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.Repositery.CertificationRepository;
import com.bezkoder.springjwt.Repositery.Question_qcmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class pdfservice {
    @Autowired
    Question_qcmRepository question_qcmRepository;
    @Autowired
    CertificationRepository certificationRepository;
  //  @Autowired
    //Filerepo courrep ;
   // public void generatePDF(String data, String filePath) {
    //    try (PDDocument document = new PDDocument()) {
        //    PDPage page = new PDPage();
          //  document.addPage(page);

         //   try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
           //     contentStream.beginText();
             //   contentStream.newLineAtOffset(25, 700);
               // contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                //contentStream.showText(data.toString());
                //contentStream.endText();
            //}

        //    document.save(filePath);
        //} catch (IOException e) {
          //  e.printStackTrace();
        //}
    //}


 //   public String generatePdfs(String data, Long qcm  ,String filePath) throws IOException, DocumentException {
   //     Document document = new Document();

     //   Question_qcm qcms = question_qcmRepository.findById(qcm).orElse(null);

       //     PdfWriter.getInstance(document, new FileOutputStream(filePath));
         //   document.open();
           // document.add(new Paragraph("question :" +qcms.getQuestion()));
            //document.add(new Paragraph("réponse :" +data.toString()));
            //document.add(new Paragraph( "\n"));
            //document.close();
           // return "123";
    //}
     //  public File store(MultipartFile file) throws IOException {
       //    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
       //    File FileDB = new File(fileName, file.getContentType(), file.getBytes());
      //    return courrep.save(FileDB);
     //  }
}
