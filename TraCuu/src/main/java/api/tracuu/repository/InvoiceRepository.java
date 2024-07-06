package api.tracuu.repository;

import api.tracuu.model.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice, Integer> {
}
