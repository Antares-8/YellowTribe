import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Label, Icon, Input } from 'semantic-ui-react';
import classNames from 'class-names';

import './sidebar.scss';


const Sidebar = ({ idOpenEvent, tags, categories, changeActiveCategories, activeCategories }) => {

  const [activeItem, setActiveItem] =
  window.location.pathname === '/calendar' || window.location.pathname === '/'
  ? useState('calendar')
  : window.location.pathname === '/news'
  ? useState('news')
  : useState('event')

  const newsPartHidden = classNames({
    hidden: activeItem === 'news',
  });

  // classNames //
  const withEvent = classNames({
    withEvent: idOpenEvent !== '',
  });
  const [categoriesLabels, setCategoriesLabels] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState();
  const [actualsTags, setActualsTags] = useState([]);
  const [tagsFind, setTagsFind] = useState([]);
  const [tagsCards, setTagsCards] = useState([]);

  const createTags = () => {
    return setTagsCards(
      actualsTags.map(tag => ([
        <Label data={tag[0].id} key={tag.id}>
          {tag[0].title}
          <Icon name='delete' />
        </Label>,
      ])),
    );
  };

  const clickHandlerNewTag = (evt) => {
    const idNewTags = evt.target.getAttribute('value');
    setTagsFind([]);
    const newTags = tags.filter(tag => tag.id == idNewTags);
    return (setActualsTags([
      ...actualsTags,
      newTags,
    ]));
  };

  const searchTag = (search) => {
    const searchLength = search.length;
    // Reg for select the same length string than the letter search
    if (searchLength !== 0) {
      const limited = new RegExp(search, 'gi');
      setTagsFind(
        tags
          .filter(tag => tag.title.match(limited))
          .map(tag => ([
            <div className="tagFind" onClick={clickHandlerNewTag}>
              <div className="name" value={tag.id}>{tag.title}</div>
            </div>,
            <hr/>,
          ])),
      );
    }
  };

  const changeSearchHandler = (evnt) => {
    evnt.persist();
    setTagsFind([]);
    searchTag(evnt.target.value);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    createTags();
  };

  const [toutes, setToutes] = useState([{ title: 'Toutes' }]);
  const [service, setService] = useState([{ title: 'Service' }]);
  const [fete, setFete] = useState([{ title: 'Fête' }]);
  const [mariage, setMariage] = useState([{ title: 'Mariage' }]);
  const [repas, setRepas] = useState([{ title: 'Repas' }]);
  const [sortie, setSortie] = useState([{ title: 'Sortie' }]);
  const [vacances, setVacances] = useState([{ title: 'Vacances' }]);
  const [autres, setAutres] = useState([{ title: 'Autres' }]);


  /// ALL /// 
  const active = () => {
    if (toutes.checked === true) {
      changeActiveCategories(toutes[0].title);
    }
    if (service.checked === true) {
      changeActiveCategories(service[0].title);
    }
    if (fete.checked === true) {
      changeActiveCategories(fete[0].title);
    }
    if (mariage.checked === true) {
      changeActiveCategories(mariage[0].title);
    }
    if (repas.checked === true) {
      changeActiveCategories(repas[0].title);
    }
    if (sortie.checked === true) {
      changeActiveCategories(sortie[0].title);
    }
    if (vacances.checked === true) {
      changeActiveCategories(vacances[0].title);
    }
    if (autres.checked === true) {
      changeActiveCategories(autres[0].title);
    }
  };
  const unCheckToutes = () => {
    setToutes({
      ...toutes,
      checked: false,
    });
    setService({
      ...service,
      checked: false,
    });
    setFete({
      ...fete,
      checked: false,
    });
    setMariage({
      ...mariage,
      checked: false,
    });
    setRepas({
      ...repas,
      checked: false,
    });
    setSortie({
      ...sortie,
      checked: false,
    });
    setVacances({
      ...vacances,
      checked: false,
    });
    setAutres({
      ...autres,
      checked: false,
    });
  };
  

  const changeHandlerCheckToutes = () => {
    if (toutes.length == 1) {
      unCheckToutes();
      setToutes({
        ...toutes,
        checked: !toutes.checked,
      });
    }
    if (toutes.checked == false) {
      unCheckToutes();
      setToutes({
        ...toutes,
        checked: !toutes.checked,
      });
    }
  };
  /// SERVICE /// 
  const changeHandlerCheckService = () => {
    if (service.length == 1) {
      unCheckToutes();
      setService({
        ...service,
        checked: !service.checked,
      });
    }
    if (service.checked == false) {
      unCheckToutes();
      setService({
        ...service,
        checked: !service.checked,
      });
    }
  };
  /// FETE /// 
  const changeHandlerCheckFete = () => {
    if (fete.length == 1) {
      unCheckToutes();
      setFete({
        ...fete,
        checked: !fete.checked,
      });
    }
    if (fete.checked == false) {
      unCheckToutes();
      setFete({
        ...fete,
        checked: !fete.checked,
      });
    }
  };
   /// MARIAGE ///
  const changeHandlerCheckMariage = () => {
    if (mariage.length == 1) {
      unCheckToutes();
      setMariage({
        ...mariage,
        checked: !mariage.checked,
      });
    }
    if (mariage.checked == false) {
      unCheckToutes();
      setMariage({
        ...mariage,
        checked: !mariage.checked,
      });
    }
  };
  /// REPAS ///
  const changeHandlerCheckRepas = () => {
    if (repas.length == 1) {
      unCheckToutes();
      setRepas({
        ...repas,
        checked: !repas.checked,
      });
    }
    if (repas.checked == false) {
      unCheckToutes();
      setRepas({
        ...repas,
        checked: !repas.checked,
      });
    }
  };
  /// SORTIES ///
  const changeHandlerCheckSortie = () => {
    if (sortie.length == 1) {
      unCheckToutes();
      setSortie({
        ...sortie,
        checked: !sortie.checked,
      });
    }
    if (sortie.checked == false) {
      unCheckToutes();
      setSortie({
        ...sortie,
        checked: !sortie.checked,
      });
    }
  };
  /// vacances ///
  const changeHandlerCheckVacances = () => {
    if (vacances.length == 1) {
      unCheckToutes();
      setVacances({
        ...vacances,
        checked: !vacances.checked,
      });
    }
    if (vacances.checked == false) {
      unCheckToutes();
      setVacances({
        ...vacances,
        checked: !vacances.checked,
      });
    }
  };
   /// AUTRES ///
  const changeHandlerCheckAutres = () => {
    if (autres.length == 1) {
      unCheckToutes();
      setAutres({
        ...autres,
        checked: !autres.checked,
      });
    }
    if (autres.checked == false) {
      unCheckToutes();
      setAutres({
        ...autres,
        checked: !autres.checked,
      });
    }
  };


  const cat = [];
  const displayCategories = () => {
    if (categoriesArray !== undefined) {
      if (categoriesArray.length !== 0) {

        cat.push(
          <Form>
            <Checkbox key="1" label={{ children: 'Toutes' }} className="categorie" checked={toutes.checked} value="all" onChange={changeHandlerCheckToutes} />
            <Checkbox key="2" label={{ children: 'Service' }} className="categorie" checked={service.checked} value="all" onChange={changeHandlerCheckService} style={{ backgroundColor: categoriesArray[0].color }} />
            <Checkbox key="3" label={{ children: 'Fête' }} className="categorie" checked={fete.checked} value="all" onChange={changeHandlerCheckFete} style={{ backgroundColor: categoriesArray[1].color }} />
            <Checkbox key="4" label={{ children: 'Mariage / PACS' }} className="categorie" checked={mariage.checked} value="all" onChange={changeHandlerCheckMariage} style={{ backgroundColor: categoriesArray[2].color }} />
            <Checkbox key="5" label={{ children: 'Repas' }} checked={repas.checked} className="categorie" value="all" onChange={changeHandlerCheckRepas} style={{ backgroundColor: categoriesArray[3].color }} />
            <Checkbox key="6" label={{ children: 'Sortie' }} checked={sortie.checked} className="categorie" value="all" onChange={changeHandlerCheckSortie} style={{ backgroundColor: categoriesArray[4].color }} />
            <Checkbox key="7" label={{ children: 'Vacances' }} checked={vacances.checked} className="categorie" value="all" onChange={changeHandlerCheckVacances} style={{ backgroundColor: categoriesArray[5].color }} />
            <Checkbox key="8" label={{ children: 'Autres' }} checked={autres.checked} className="categorie" value="all" onChange={changeHandlerCheckAutres} style={{ backgroundColor: categoriesArray[6].color }} />
          </Form>,
        );
        setCategoriesLabels(cat);
      }
    }
  };

  useEffect(() => createTags(), [tags, actualsTags]);
  useEffect(() => setCategoriesArray(categories), [categories]);
  useEffect(() => displayCategories(), [categoriesArray, toutes, service, fete, mariage, vacances, sortie, repas, autres]);
  useEffect(() => active(), [toutes, service, fete, mariage, vacances, sortie, repas, autres]);
  useEffect(() => changeHandlerCheckToutes(), []);


  return (
    <div className={`sidebar ${withEvent} ${newsPartHidden}`}>
      <div className="title">
        categories
      </div>
      {categoriesLabels}
      {/* <div className="tribeTag">

        <div className="tags">
          <div className="searchBar">
            <div className="ui input">
              <Input placeholder="Tags" icon="search" id="searchBarTag" search selection onChange={changeSearchHandler} onSubmit={submitHandler} />
            </div>
            <div className="results">
              {tagsFind}
            </div>
          </div>
          {tagsCards}
        </div>
      </div>    */}
    </div>
  );
};

Sidebar.propTypes = {
  idOpenEvent: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  activeCategories: PropTypes.string.isRequired,
};

// == Export
export default Sidebar;
