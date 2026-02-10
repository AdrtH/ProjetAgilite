
from django.test import TestCase
from django.contrib.auth import get_user_model
from equipements.models import SportModel, Sport, NiveauSportif

# Create your tests here.

class UserModelTest(TestCase):
    def test_create_user_with_niveau_sportif(self):
        userModel = get_user_model()

        user = userModel.objects.create_user(
            username="alice",
            password="test1234",
            niveauSportif=NiveauSportif.CONFIRME
        )

        self.assertEqual(user.niveauSportif, NiveauSportif.CONFIRME)

    def test_default_niveau_sportif(self):
        userModel = get_user_model()

        user = userModel.objects.create_user(
            username="bob",
            password="test1234"
        )

        self.assertEqual(user.niveauSportif, NiveauSportif.DEBUTANT)

    def test_user_can_have_multiple_sports(self):
        userModel = get_user_model()

        football = SportModel.objects.create(code=Sport.FOOTBALL)
        tennis = SportModel.objects.create(code=Sport.TENNIS)

        user = userModel.objects.create_user(
            username="charlie",
            password="test1234"
        )

        user.sportsPratique.add(football, tennis)

        sports = user.sportsPratique.all()

        self.assertEqual(sports.count(), 2)
        self.assertIn(football, sports)
        self.assertIn(tennis, sports)

#
