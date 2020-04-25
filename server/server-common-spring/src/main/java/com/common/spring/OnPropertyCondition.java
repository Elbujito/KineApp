package com.common.spring;


import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;


public class OnPropertyCondition implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        String[] properties = getAttribute(metadata, "properties", String[].class).orElseThrow(NoSuchElementException::new);
        List<String> availableProperties = Stream.of(properties)//
                                                 .map(attribute -> getProperty(context, attribute))//
                                                 .filter(property -> property != null && !property.isEmpty())//
                                                 .collect(Collectors.toList());
        if (availableProperties.isEmpty()) {
            return getAttribute(metadata, "matchIfMissing", Boolean.class).orElse(false);
        }
        else {
            String value = getAttribute(metadata, "havingValue", String.class).orElseThrow(NoSuchElementException::new);
            return availableProperties.stream()//
                                      .map(property -> property.split("\\s*,\\s*"))//
                                      .flatMap(Arrays::stream)//
                                      .filter(formattedProperty -> !formattedProperty.isEmpty())//
                                      .anyMatch(value::equals);
        }

    }

    private <T> Optional<T> getAttribute(AnnotatedTypeMetadata metadata, String name, Class<T> clazz) {
        return Optional.ofNullable(metadata.getAnnotationAttributes(ConditionalOnArrayProperty.class.getName())) //
                       .map(attributes -> attributes.get(name)) //
                       .map(clazz::cast);

    }

    private String getProperty(ConditionContext context, String name) {
        return context.getEnvironment().getProperty(name);
    }

}
