package com.repository;

import com.model.rest.Bilan;

import java.util.*;
import java.util.stream.Collectors;

public class BilanRepository
{
    public static class DbBilanRepository {

        public List<Bilan> bilanList;

        public DbBilanRepository()
        {
            this.bilanList = new ArrayList();
            this.bilanList.add(new Bilan("1", "Bilan 1","06/10/20","Adrien va bien"));
            this.bilanList.add(new Bilan("2","Bilan 2","10/11/20","Rafael va moins bien"));
            this.bilanList.add(new Bilan("3",  "Bilan 3",  "05/08/20","Thomas va très bien"));
            this.bilanList.add(new Bilan("4","Bilan 4", "021/10/20","Victor va pas bien"));
        }

        public List<Bilan> getBilans()
        {
            return this.bilanList;
        }

        public void addBilan(Bilan bilan)
        {
            this.bilanList.add(bilan);
        }

        public void removeBilan(Bilan bilan)
        {
            this.bilanList.remove(bilan);
        }

        public Bilan findBilanById(String id)
        {
            return this.bilanList.stream()
                    .filter(bilan -> id.equals(bilan.getId()))
                    .findAny()
                    .orElse(null);
        }

        public void removeBilanById(String id)
        {
            removeBilan(this.bilanList.stream()
                    .filter(bilan -> id.equals(bilan.getId()))
                    .findAny()
                    .orElse(null));
        }
    }
}
