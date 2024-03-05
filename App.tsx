import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { NativeRouter as Router, Routes, Route } from 'react-router-native';
import CompetitionsList from './containers/CompetitionsList';
import AddCompetitionForm from './containers/CREATE/AddCompetitionForm';
import UpdateCompetitions from './containers/UPDATE/UpdateCompetition';
import SportsmanList from './containers/SportsmansList';
import RegulationsList from './containers/RegulationsList';
import AddSportsmanForm from './containers/CREATE/AddSportsmanForm';
import AddRegulationForm from './containers/CREATE/AddRegulationForm';
import UpdateRegulationForm from './containers/UPDATE/UpdateRegulation';
import UpdateSportsmanForm from './containers/UPDATE/UpdateSportsman';

const WelcomePage = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', padding: 20 }}>
    <Text style={{ fontSize: 24, color: 'white' }}>Це CRUD</Text>
  </View>
);

function App() {
  return (
    <View style={{ flex: 1 }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          
          <Route path="/competitions" element={<CompetitionsList />} />
          <Route path="/sportsmans" element={<SportsmanList />} />
          <Route path="/regulations" element={<RegulationsList />} />
          
          <Route path="/competitions/:id/update" element={<UpdateCompetitions/>} />
          <Route path="/regulations/:id/update" element={<UpdateRegulationForm/>} />
          <Route path="/sportsmans/:id/update" element={<UpdateSportsmanForm/>} />
          
          <Route path="/competitions/create" element={<AddCompetitionForm />} />
          <Route path="/sportsmans/create" element={<AddSportsmanForm />} />
          <Route path="/regulations/create" element={<AddRegulationForm/>} />

        </Routes>
        <Footer />
      </Router>
    </View>
  );
}

export default App;
