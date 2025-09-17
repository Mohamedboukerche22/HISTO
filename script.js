 const cardsData = [
            {
                type: "personality",
                title: "ادولف هتلر ",
                content: "صانع الصابون",
                details: "1933->1945  اشعل الحرب العالمية 2 رفقت ايطاليا واليابان التي انتهت بهزيمة دول المحور وانتصار دول الحلفاء"
            },
            {
                type: "event",
                title: "06-09 اوت 1945",
                content: "هيروشيما و ناكازاكي",
                details: "القاء امريكا للقنبلتين النوويتين على هيروشيما و ناكازاكي"
            },
             {
                 "type": "personality",
                  "title": "ونستون تشرشل",
                  "content": "سياسي بريطاني",
                  "details": "سياسي بريطاني قاد بريطانيا في الحرب العالمية 2 , صاحب مصطلح الستار الحديدي سنة 1946 , نال جائزة نوبل للآداب "
  }
  
        ];

        const cardsContainer = document.getElementById('cards-container');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('search-input');
        const progressBar = document.getElementById('progress-bar');

        // عرض البطاقات
        function renderCards(cards) {
            cardsContainer.innerHTML = '';
            
            cards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                cardElement.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">
                            <span class="card-type">${card.type === 'personality' ? 'شخصية' : 'حدث تاريخي'}</span>
                            <h3 class="card-title">${card.title}</h3>
                            <p class="card-content">${card.content}</p>
                            <div class="flip-instruction">انقر لقلب البطاقة</div>
                        </div>
                        <div class="card-back">
                            <h3 class="card-title">${card.title}</h3>
                            <p class="card-content">${card.details}</p>
                            <div class="card-actions">
                                <button class="card-btn mark-known">علمت هذا</button>
                                <button class="card-btn need-review">أحتاج مراجعة</button>
                            </div>
                        </div>
                    </div>
                `;
                
                cardsContainer.appendChild(cardElement);
                cardElement.style.animationDelay = `${index * 0.1}s`;
                cardElement.addEventListener('click', function() {
                    this.classList.toggle('flipped');
                });
            });
            
            updateProgressBar();
        }

        function filterCards(filter) {
            if (filter === 'all') {
                return cardsData;
            }
            return cardsData.filter(card => card.type === filter);
        }

        function searchCards(query) {
            if (!query) return cardsData;
            
            return cardsData.filter(card => 
                card.title.includes(query) || 
                card.content.includes(query) || 
                card.details.includes(query)
            );
        }


        function updateProgressBar() {
            const totalCards = cardsData.length;
            const knownCards = document.querySelectorAll('.mark-known.learned').length;
            const progress = (knownCards / totalCards) * 100;
            progressBar.style.width = `${progress}%`;
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const filteredCards = filterCards(filter);
                renderCards(filteredCards);
            });
        });

        searchInput.addEventListener('input', function() {
            const query = this.value;
            const filteredCards = searchCards(query);
            renderCards(filteredCards);
        });

        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('mark-known')) {
                e.target.classList.toggle('learned');
                e.target.textContent = e.target.classList.contains('learned') ? 'معلومة مكتسبة ✓' : 'علمت هذا';
                e.stopPropagation();
                updateProgressBar();
            }
            
            if (e.target.classList.contains('need-review')) {
                alert('سيتم تذكيرك بهذه البطاقة لاحقًا للمراجعة');
                e.stopPropagation();
            }
        });

        renderCards(cardsData);
