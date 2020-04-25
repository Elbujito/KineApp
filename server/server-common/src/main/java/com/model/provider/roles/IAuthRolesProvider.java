package com.model.provider.roles;


import java.util.Set;
import com.model.AuthException;
import com.model.user.User;


public interface IAuthRolesProvider {

    Set<String> getRoles(User user) throws AuthException;

}
