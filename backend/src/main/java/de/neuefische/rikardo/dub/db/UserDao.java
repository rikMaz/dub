package de.neuefische.rikardo.dub.db;

import de.neuefische.rikardo.dub.model.user.dubUser;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository<dubUser, String> {
}
