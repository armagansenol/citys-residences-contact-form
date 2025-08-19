import { LegalLayout } from "@/components/legal-layout"
import { Wrapper } from "@/components/wrapper"

export default function Page() {
  return (
    <Wrapper>
      <LegalLayout>
        <h1>Kişisel Verilerin Aktarılmasına İlişkin Açık Rıza Metni</h1>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) nezdinde Veri Sorumlusu sıfatını haiz
          Citys Gayrimenkul Geliştirme A.Ş. (&ldquo;Şirket&rdquo;) tarafından sizinle paylaşılan &ldquo;Kişisel
          Verilerin Korunması ve İşlenmesi Aydınlatma Metni&rdquo; kapsamında işlenen kişisel verilerinizin,
          Kanun&apos;un 9. maddesinde belirtilen rıza alınmasına yer olmayan durumlar hariç olmak üzere, aşağıda
          belirtilen şekillerde aktarılması için açık rızanız talep olunmaktadır:
        </p>
        <p>
          Kimlik, İletişim, Mesleki Deneyim, Pazarlama Bilgileri, Hukuki İşlem Bilgileri, Finans, Müşteri İşlemleri,
          İşlem Güvenliği gibi kişisel verilerimin Şirket&apos;in teknik altyapısında kullanılan sunucuların yurt
          dışında olması sebebiyle ve tarafıma hizmet sunulması amacıyla Aydınlatma Metni kapsamında belirtilen kişisel
          verilerimin; Aydınlatma Metni&apos;ndeki amaçlar ve bu amaçlara ek olarak toplama, işleme, saklama ve arşiv
          faaliyetlerinin yürütülmesi amacıyla sınırlı olarak KVKK&apos;nın 5, 6, 7, 8, 9&apos;uncu maddesinde düzenleme
          altına alınan &ldquo;Açık Rıza&rdquo; hukuki sebebine dayalı olarak yurt içinde ve/veya yurt dışında üçüncü
          kişilere aktarılmasına yukarıdaki hususlarda bilgilendirildikten, bilgilendirmeye konu hususları anladıktan ve
          kayıtlara ilişkin yasal haklarımı öğrendikten sonra açık rızam ile onay veriyorum.
        </p>
      </LegalLayout>
    </Wrapper>
  )
}
