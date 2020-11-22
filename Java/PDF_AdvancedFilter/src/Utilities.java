import java.awt.geom.Rectangle2D;
import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;


public class Utilities{
	public Utilities() throws IOException {
		
	}

	public static File ruta = new File("C:\\Users\\Oleg\\Desktop\\PDF_Reader\\");
	public static File[] pdfs = ruta.listFiles();

	public static void main(String[] args) {
		try {
			FontSizeDetector fontSizeDetector = new FontSizeDetector();
			
			PDDocument pdfDocument = PDDocument.load(pdfs[0]);
	    	
	    	PDFTextStripper stripper = new FontSizeDetector();
	    	String st = stripper.getText(pdfDocument);
	    	System.out.println(FontSizeDetector.getTextProva());
	    	//System.out.println(st);
	    	
	    	pdfDocument.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		//llegirPDF(pdfs[0]);
		
	}

	public static String llegirPDF(File ruta) {
		String stringRetornar = "";

		try {
			PDDocument pdfDocument = PDDocument.load(ruta);

			//retornarIndex(pdfDocument);

			pdfDocument.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return stringRetornar;
	}	
}