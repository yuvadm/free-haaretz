FILENAME=free-haaretz

package:
	zip -r $(FILENAME).zip *
	cp $(FILENAME).zip $(FILENAME)-unsigned.xpi

clean:
	rm -f $(FILENAME).zip
	rm -f $(FILENAME)-unsigned.xpi
