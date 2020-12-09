package de.neuefische.rikardo.dub.security;

import de.neuefische.rikardo.dub.db.UserDao;
import de.neuefische.rikardo.dub.model.user.dubUser;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MongoDbUserDetailsService implements UserDetailsService {

    private final UserDao userDao;

    public MongoDbUserDetailsService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<dubUser> userById = userDao.findById(username);
        if(userById.isEmpty()){
            throw new UsernameNotFoundException("user not found");
        }
        return new User(username, userById.get().getPassword(), List.of());
    }
}