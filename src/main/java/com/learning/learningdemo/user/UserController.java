package com.learning.learningdemo.user;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v2/users")
public class UserController {
    @GetMapping
    public List<User> getAllUsers() {
        return Arrays.asList(
                new User(1L,
                        "Silviu",
                        "silviu@gmail.com",
                        Gender.MALE,
                        "Lorer asmsan sfo am fidnnga sgk sgoa ksapgnpgifnfpgin apsgda psaidfp dasinfp saindfpasn"),
                new User(2L,
                        "Alina",
                        "alina@gmail.com",
                        Gender.FEMALE,
                        "lnsfjnapnf fna  ouasb ofusd bf vn sdub dosu sdbuvosa bvosdbv subouo odubvo")
        );
    }
}
