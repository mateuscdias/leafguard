% leafguard prolog code responsible for infering plant diseases from symptoms and environmental factors
% The language used for the symptoms is Portuguese.

%Leaf symptoms

symptom(small_dark_spots_on_the_back,'Pequenas manchas escuras no verso da folha').
symptom(powdering_brown_spots,'Manchas marrons que liberam pó').
symptom(leaf_yellowing,'Amarelecimento das folhas').
symptom(leaf_inferior_face_rib_darkening, 'Escurecimento das nervuras').
symptom(losing_leaves,'Desfolha das plantas').
symptom(small_dark_circular_spots,'Pequenas manchas pretas circulares concentricas').
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
environmental(none, 'Nao ha fatores reconhecidos').

%fungal diseases supported

disease('Ferrugem Asiática',
    fungal,
    [symptom(small_dark_spots_on_the_back),symptom(powdering_brown_spots),symptom(losing_leaves)],
    [environmental(high_humidity),environmental(hotter_temperatures)]
).

disease('Mal do Panamá',
    fungal,
    [symptom(leaf_yellowing),symptom(leaf_hanged_like_a_skirt),symptom(dark_internal_vessels_when_cut)],
    [environmental(high_humidity),environmental(hotter_temperatures)]
).

disease('Pinta Preta',
    fungal,
    [symptom(small_dark_circular_spots),symptom(yellow_halo_around_spot),symptom(fast_drying_inferior_leaves)],
    [environmental(high_humidity),environmental(hotter_temperatures)]
).

disease('Oídio',
    fungal,
    [symptom(white_powdering_spots),symptom(new_buds_deformation),symptom(premature_flowers_dropping),symptom(premature_fruits_dropping)],
    [environmental(high_humidity),environmental(hotter_temperatures)]
).

disease('Antracnose',
    fungal,
    [symptom(dark_and_deep_dry_spots),symptom(leaf_inferior_face_rib_darkening),symptom(branches_points_dying)],
    [environmental(high_humidity),environmental(hotter_temperatures)]
).

%bacterial diseases supported

disease('Murcha Bacteriana',
    bacterial,
    [symptom(leaves_drying_during_day),symptom(leaves_recovering_during_night),symptom(vascular_system_darkening),symptom(viscous_liquid_when_cut_stem_dipped_on_water)],
    [environmental(rain)]
).

disease('Cancro Cítrico',
    bacterial,
    [symptom(brown_rough_spots),symptom(yellow_halo_around_spot),symptom(premature_fruits_dropping),symptom(spots_on_fruits)],
    [environmental(rain)]
).

disease('Podridão',
    bacterial,
    [symptom(yellow_v_shaped_spots),symptom(leaf_inferior_face_rib_darkening),symptom(strong_rot_smell)],
    [environmental(rain)]
).

disease('Mancha Bacteriana',
    bacterial,
    [symptom(beige_aquous_spots),symptom(flowers_and_floral_button_falling),symptom(rough_spots_on_fruits)],
    [environmental(rain)]
).

disease('Podridão Mole',
    bacterial,
    [symptom(gelatinous_tissue_consistency),symptom(rapid_root_desintegration),symptom(rapid_fruit_desintegration),symptom(strong_rot_smell)],
    [environmental(rain)]
).

%viral diseases supported

disease(
    'Mosaico Dourado',
    viral,
    [symptom(strong_yellow_spots),symptom(leaf_structure_deformated),symptom(grains_size_reduction)],
    [environmental(plagues)]
).

disease('Vira-Cabeça',
    viral,
    [symptom(bronzening_young_leaves),symptom(purple_spots_on_young_leaves),symptom(curving_of_the_top_of_stem),symptom(concentric_rings)],
    [environmental(plagues)]
).

disease('Mosaico do Mamoeiro',
    viral,
    [symptom(simple_rings),symptom(green_stripes),symptom(thin_new_leaves)],
    [environmental(plagues)]
).

disease('Tristeza dos Citros',
    viral,
    [symptom(yellowing_of_whole_plant),symptom(pitting),symptom(smaller_fruits)],
    [environmental(plagues)]
).

disease('Mosaico da Mandioca',
    viral,
    [symptom(dark_and_light_green_areas),symptom(leaf_structure_deformated),symptom(severe_root_size_reduction)],
    [environmental(plagues)]
).

% Diseased caused by verms

disease('Nematoide de Galha',
    verms,
    [symptom(root_nodules),symptom(wiltering_on_hotter_hours),symptom(uneven_growing)],
    [environmental(none)]
).

disease('Nematoide de Lesao',
    verms,
    [symptom(necrotic_root_areas),symptom(smaller_root_system),symptom(aerial_part_yellowing_or_fall)],
    [environmental(none)]
).

disease('Nematoide do Cisto',
    verms,
    [symptom(verms_on_roots),symptom(intense_leave_yellowing),symptom(smaller_size)],
    [environmental(none)]
).

disease('Nematoide Reniforme',
    verms,
    [symptom(excess_dirt_on_roots),symptom(improductive_plants),symptom(slow_response_to_fertilization)],
    [environmental(none)]
).

disease('Nematoide Cavernicola',
    verms,
    [symptom(red_or_dark_spots_on_roots),symptom(falling),symptom(fruits_weight_reduction)],
    [environmental(none)]
).

% Checking algorithms

% ============================================
% HELPER PREDICATES
% ============================================

% Calculate the length of a list
list_length([], 0).
list_length([_|T], N) :-
    list_length(T, N1),
    N is N1 + 1.

% Calculate confidence based on matching items
calculate_confidence([], _, 1.0).
calculate_confidence(Required, Observed, Confidence) :-
    Required \= [],
    list_length(Required, Total),
    count_matches(Required, Observed, MatchCount),
    Confidence is MatchCount / Total.

% Count how many items from Required are in Observed
count_matches([], _, 0).
count_matches([H|T], Observed, Count) :-
    (member(H, Observed) ->
        count_matches(T, Observed, RestCount),
        Count is RestCount + 1
    ;
        count_matches(T, Observed, RestCount),
        Count is RestCount
    ).

% ============================================
% DIAGNOSIS PREDICATES
% ============================================

% Main diagnosis predicate
diagnose(Symptoms, Environment, Disease, Confidence) :-
    disease(Disease, _, RequiredSymptoms, EnvFactors),
    calculate_confidence(RequiredSymptoms, Symptoms, SymptomConfidence),
    calculate_confidence(EnvFactors, Environment, EnvConfidence),
    Confidence is (SymptomConfidence * 0.7 + EnvConfidence * 0.3),
    Confidence >= 0.5.

% Get possible diseases based on symptoms only
possible_diseases(Symptoms, Disease, Confidence) :-
    disease(Disease, _, RequiredSymptoms, _),
    calculate_confidence(RequiredSymptoms, Symptoms, Confidence),
    Confidence > 0.

% Get symptoms for a specific disease
disease_symptoms(Disease, Symptoms) :-
    disease(Disease, _, Symptoms, _).

% Get disease type
disease_type(Disease, Type) :-
    disease(Disease, Type, _,_).

% Get environmental factors for a disease
disease_environment(Disease, Environment) :-
    disease(Disease, _, _, Environment).

% List all diseases
list_all_diseases(Diseases) :-
    findall(Disease, disease(Disease, _, _, _), Diseases).

% Weighted diagnosis (for backward compatibility)
diagnose_weighted(Symptoms, Environment, Disease, Score ) :-
    disease(Disease, _, RequiredSymptoms, EnvFactors),
    calculate_confidence(RequiredSymptoms, Symptoms, SymptomScore),
    calculate_confidence(EnvFactors, Environment, EnvScore),
    Score is (SymptomScore * 0.7 + EnvScore * 0.3),
    Score >= 0.6.