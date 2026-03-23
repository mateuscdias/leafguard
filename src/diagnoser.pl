% leafguard prolog code responsible for infering plant diseases from symptoms and environmental factors
% The language used for the symptoms is Portuguese.

%Leaf symptoms

symptom(small_dark_spots_on_the_back,'Pequenas manchas escuras no verso da folha').
symptom(powdering_brown_spots,'Manchas marrons que liberam pó').
symptom(leaf_yellowing,'Amarelecimento das folhas').
symptom(leaf_inferior_face_rib_darkening, 'Escurecimento das nervuras').
symptom(losing_leaves,'Desfolha das plantas').
symptom(small_dark_circular_spots,'Pequenas manchas circulares').
symptom(yellow_halo_around_spot,'Halo amarelado ao redor da lesão').
symptom(fast_drying_inferior_leaves,'Secamento rápido das folhas inferiores').
symptom(white_powdering_spots,'Manchas brancas que parecem farinha').
symptom(premature_leaves_dropping,'Queda prematura de folhas').
symptom(leaves_drying_during_day,'Folhas murchando durante o dia').
symptom(leaves_recovering_during_night,'Folhas murchas recuperando durante a noite').
symptom(brown_rough_spots,'Manchas marrons ásperas').
symptom(yellow_v_shaped_spots,'Manchas amareladas em formato de V').
symptom(beige_aquous_spots,'Manchas aquosas que ficam com o centro bege').
symptom(strong_yellow_spots,'Manchas amarelo ouro intensas').
symptom(bronzening_young_leaves,'Folhas jovens bronzeando').
symptom(purple_spots_on_young_leaves,'Manchas roxas em folhas jovens').
symptom(thin_new_leaves,'Folhas novas afinadas').
symptom(dark_and_light_green_areas,'Áreas verde-claro e verde-escuras nas folhas').
symptom(twisted_and_dry_leaves,'Folhas secas e retorcidas').
symptom(intense_leave_yellowing,'Amarelecimento severo das folhas').
symptom(leaf_hanged_like_a_skirt,'Folha pendurada como uma saia').
symptom(leaf_structure_deformated,'Deformação na estrutura da folha').

%Stem and roots symptoms

symptom(dark_internal_vessels_when_cut,'Vasos internos da planta escuros (vistos ao cortar)').
symptom(new_buds_deformation,'Deformação de brotos novos').
symptom(branches_points_dying,'Morte dos ponteiros dos ramos').
symptom(vascular_system_darkening,'Escurecimento do tecido vascular do caule').
symptom(viscous_liquid_when_cut_stem_dipped_on_water,'Líquido purulento sai quando mergulha um pedaço do caule na água').
symptom(curving_of_the_top_of_stem,'Curvatura do ponteiro para baixo').
symptom(green_stripes,'Estrias verdes no caule').
symptom(pitting,'Pequenos furos na madeira abaixo da casca').
symptom(rapid_root_desintegration,'Desintegração da polpa da raiz').
symptom(severe_root_size_reduction,'Redução severa no tamanho das raízes').   
symptom(root_nodules,'Formação de nódulos (ou tumores) nas raízes').
symptom(necrotic_root_areas,'Áreas necrosadas nas raízes, ou áreas escuras').
symptom(smaller_root_system,'Sistema de raízes muito curto ou sem pelos absorventes').
symptom(verms_on_roots,'Presença de pequenos vermes nas raízes').
symptom(excess_dirt_on_roots,'Excesso de terra nas raízes').
symptom(red_or_dark_spots_on_roots,'Manchas avermelhadas ou pretas nas raízes').

%Flowers and Fruits symptoms

symptom(premature_flowers_dropping,'Queda prematura de flores').
symptom(premature_fruits_dropping,'Queda prematura de flores e frutos').
symptom(dark_and_deep_dry_spots,'Lesões escuras e "fundas" nos frutos').
symptom(spots_on_fruits,'Presença de manchas nos frutos').
symptom(flowers_and_floral_button_falling,'Queda de flores e botões florais').
symptom(rough_spots_on_fruits,'Frutas com lesões ásperas e rasas').
symptom(rapid_fruit_desintegration,'Desintegração rápida da polpa do fruto').
symptom(grains_size_reduction,'Redução drástica do tamanho das vagens e grãos').
symptom(concentric_rings,'Frutos com anéis amarelados ou necróticos (podres)').
symptom(simple_rings,'Manchas aneladas simples nas cascas dos frutos').
symptom(smaller_fruits,'Redução do tamanho dos frutos').
symptom(fruits_weight_reduction,'Redução do peso do cacho ou frutas').


%full plant symptoms
symptom(strong_rot_smell,'Cheiro forte de podridão').
symptom(gelatinous_tissue_consistency,'Tecidos com consistência gelatinosa').
symptom(yellowing_of_whole_plant,'Amarelecimento geral de toda a planta').
symptom(wiltering_on_hotter_hours,'Murcha da planta nos horários mais quentes do dia').
symptom(uneven_growing,'Crescimento desigual da lavoura (reboleiras)').
symptom(aerial_part_yellowing_or_fall,'Amarelecimento e queda de vigor da parte aérea').
symptom(smaller_size,'Redução de tamanho acentuado das plantas').
symptom(improductive_plants,'Plantas improdutivas').
symptom(slow_response_to_fertilization,'Resposta fraca à adubação').
symptom(falling,'Tombamento de plantas devido à baixa fixação').

%environmental factors

environmental(high_humidity,'Alta umidade').
environmental(hotter_temperatures,'Temperaturas quentes').
environmental(rain,'Chuvas recentes').
environmental(plagues,'Presença de insetos').

%fungal diseases supported

disease('Ferrugem Asiática',fungal,[symptom()],[environmental()]).
disease('Mal do Panamá',fungal,[symptom()],[environmental()]).
disease('Pinta Preta',fungal,[symptom()],[environmental()]).
disease('Oídio',fungal,[symptom()],[environmental()]).
disease('Antracnose',fungal,[symptom()],[environmental()]).

%bacterial diseases supported

disease('Murcha Bacteriana',bacterial,[symptom()],[environmental()]).
disease('Cancro Cítrico',bacterial,[symptom()],[environmental()]).
disease('Podridão',bacterial,[symptom()],[environmental()]).
disease('Mancha Bacteriana',bacterial,[symptom()],[environmental()]).
disease('Podridão Mole',bacterial,[symptom()],[environmental()]).

%viral diseases supported

disease('Mosaico Dourado',viral,[symptom()],environmental()).
disease('Vira-Cabeça',viral,[symptom()],environmental()).
disease('Mosaico do Mamoeiro',viral,[symptom()],environmental()).
disease('Tristeza dos Citros',viral,[symptom()],environmental()).
disease('Mosaico da Mandioca',viral,[symptom()],environmental()).
